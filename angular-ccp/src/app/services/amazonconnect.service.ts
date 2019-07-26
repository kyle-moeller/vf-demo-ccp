import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from "src/environments/environment";
import * as _ from "lodash";
import { ReplaySubject } from "rxjs";
import { ParameterizedPhoneNumber } from "../models/parameterized-phone-number";
import { Country } from "../models/country";

declare var connect;

declare var connectLoginWin;

const completeCountryList = require("src/assets/country_list.json");

@Injectable()
export class AmazonconnectService {
  private updatedAgent: any;

  agentErrorStates: string[];

  private agent: any;
  observableAgent: BehaviorSubject<any>;

  private availableAgentStates: any;
  observableAgentStates: BehaviorSubject<any>;

  private agentEndpoints: any;
  observableAgentEndpoints: BehaviorSubject<any>;

  private contact: any;
  observableContact: ReplaySubject<any>;

  private isMuted: boolean = false;

  connectErrorEvent: ReplaySubject<any>;

  constructor() {
    this.agent;
    this.observableAgent = new BehaviorSubject<any>(this.updatedAgent);
    this.availableAgentStates = {};
    this.observableAgentStates = new BehaviorSubject<any>(
      this.availableAgentStates
    );
    this.agentEndpoints = {};
    this.observableAgentEndpoints = new BehaviorSubject<any>(
      this.agentEndpoints
    );
    this.observableContact = new ReplaySubject<any>();
    this.connectErrorEvent = new ReplaySubject<any>();
  }

  eventChange() {
    this.observableAgentStates.next(this.availableAgentStates);
    this.observableAgent.next(this.updatedAgent);
    this.observableAgentEndpoints.next(this.agentEndpoints);
  }

  async initConnect(containerDiv) {
    connect.core.initCCP(containerDiv, {
      ccpUrl: environment.ccpUrl,
      // absoluteLoginUrl: environment.samlSsoUrl,
      loginPopup: true,
      softphone: {
        allowFramedSoftphone: true
      }
    });

    connect.agent(agent => {
      this.agent = agent;
      this.updatedAgent = agent;

      console.log("connect.agent");

      if (agent) {
        this.getAgentQuickConnects();
        this.setAgentCallbacks();
        this.getAgentStates(agent);
      }

      if (connectLoginWin) {
        connectLoginWin.close();
      }
    });

    connect.contact(contact => {
      this.contact = contact;

      console.log("connect.contact");

      contact.onRefresh(contact => {
        this.contact = contact;

        this.observableContact.next(this.contact);

        console.log("contact.onRefresh");
      });

      contact.onConnecting(contact => {
        console.log("connect.onConnecting");
      });

      contact.onConnected(function() {
        console.log("contact.onConnected");
      });

      contact.onIncoming(function(contact) {
        console.log("contact.onIncoming");
      });

      contact.onAccepted(function(contact) {
        console.log("contact.onAccepted");
      });

      contact.onEnded(function(contact) {
        console.log("contact.onEnded");

        this.contact = null;

        this.observableContact.next(this.contact);
      });
    });
  }

  getAgentStates(agent) {
    console.log("getting agent states...");
    this.availableAgentStates = agent.getAgentStates();
    this.agentErrorStates = Object.values(connect.AgentErrorStates);
    this.eventChange();
  }

  getAgentQuickConnects() {
    console.log("getting quickconnect agents...");
    this.updatedAgent.getEndpoints(this.updatedAgent.getAllQueueARNs(), {
      success: data => {
        console.log("agent.getEndpoints success");
        console.log(data.addresses);

        this.agentEndpoints = data.addresses;

        if (this.getAgentStatus().name !== "Busy") {
          this.agentEndpoints = _.filter(this.agentEndpoints, ep => {
            return ep.type === "phone_number";
          });
        }

        this.eventChange();
      },
      failure: (err, data) => {
        console.log("agent.getEndpoints failure");
      }
    });
  }

  setAgentCallbacks() {
    this.agent.onRefresh(agent => {
      this.updatedAgent = agent;
      this.getAgentQuickConnects();
      this.eventChange();
    });

    this.agent.onRoutable(agent => {
      console.log("agent.onRoutable");
    });

    this.agent.onNotRoutable(agent => {
      console.log("agent.onNotRoutable");
    });

    this.agent.onOffline(agent => {
      console.log("agent.onOffline");
    });

    this.agent.onAfterCallWork(agent => {
      console.log("agent.onAfterCallWork");

      if (this.isAgentMuted()) {
        this.toggleMute();
      }
    });

    this.agent.onStateChange(agent => {
      if (
        agent.getState().name === "MissedCallAgent" ||
        agent.getState().name === "Default"
      ) {
        this.contact = null;
        this.observableContact.next(this.contact);
      }
    });

    this.agent.onError(agent => {
      console.log("agent.onError");
    });
  }

  placeCall(numberToCall) {
    if (this.updatedAgent) {
      let endpoint = connect.Endpoint.byPhoneNumber(numberToCall);

      this.updatedAgent.connect(
        endpoint,
        {
          success: () => {
            console.log("agent.connect success");
          },
          failure: () => {
            console.log("agent.connect failure");
            this.connectErrorEvent.next(
              "We are unable to complete the call as dialed. Try again, or contact your administrator."
            );
          }
        }
      );
    }
  }

  transferCall(selectedEndpoint) {
    if (this.contact) {
      if (selectedEndpoint) {
        this.contact.addConnection(selectedEndpoint, {
          success: () => {
            console.log("contact.addConnection success");
          },
          failure: () => {
            console.log("contact.addConnection failure");
            this.connectErrorEvent.next(
              "Quick connect transfer failed. Try again or contact your administrator."
            );
          }
        });
      }
    }
  }

  cancelCall() {
    if (this.contact) {
      this.contact.getAgentConnection().destroy({
        success: () => {
          console.log("connection.destroy success");
        },
        failure: () => {
          console.log("connection.destroy failure");
        }
      });
    }
  }

  acceptCall() {
    if (this.contact) {
      this.contact.accept({
        success: () => {
          this.eventChange();
        },
        failure: () => {}
      });
    }
  }

  holdCall() {
    if (this.contact) {
      let conn = this.contact.getActiveInitialConnection();

      if (conn) {
        if (!conn.isOnHold()) {
          conn.hold({
            success: () => {
              console.log("connection.hold success");
            },
            failure: () => {
              console.log("connection.hold failure");
            }
          });
        } else {
          conn.resume({
            success: () => {
              console.log("connection.resume success");
            },
            failure: () => {
              console.log("connection.resume failure");
            }
          });
        }
      }
    }
  }

  declineCall() {
    if (this.contact) {
      let conn = this.contact.getActiveInitialConnection();

      if (conn) {
        conn.destroy({
          success: () => {
            console.log("activeInitialConnection.destroy success");
          },
          failure: () => {
            console.log("activeInitialConnection.destroy failure");
          }
        });
      }
    }
  }

  setAgentStatus(statusToSet) {
    if (this.updatedAgent) {
      let routableState = this.availableAgentStates.filter(function(state) {
        return state.name === statusToSet;
      })[0];

      this.updatedAgent.setState(routableState, {
        success: () => {},
        failure: () => {}
      });
    }
  }

  getAgentStatus() {
    if (this.updatedAgent) {
      return this.updatedAgent.getState();
    } else return "init";
  }

  /*
    This function is intended to determine the CCP state.
    If there is a connection active, it will use the state of the connection, otherwise it will use the agent state.
    There are custom states defined for use when a call involves multiple parties (transfer) seen below

    Transfer states: 

    transfer-connecting ringing
    transfer-2 2nd line active
    transfer-1 1st line active
    transfer-hold all lines held
    transfer-join all lines active

  */
  getCCPState() {
    const agentStatus = this.getAgentStatus().name;

    try {
      let activeInitialConnection = this.contact.getActiveInitialConnection();
      let transferConnection = this.contact.getSingleActiveThirdPartyConnection();

      if (transferConnection && this.getAgentStatus().name === "Busy") {
        let transferStatus = transferConnection.getStatus().type;
        let initialStatus = activeInitialConnection
          ? activeInitialConnection.getStatus().type
          : "disconnected";

        if (transferStatus === "connecting") {
          return "transfer-connecting";
        } else if (transferStatus === "connected" && initialStatus === "hold") {
          return "transfer-2";
        } else if (transferStatus === "hold" && initialStatus === "connected") {
          return "transfer-1";
        } else if (transferStatus === "hold" && initialStatus === "hold") {
          return "transfer-hold";
        } else if (
          transferStatus === "connected" &&
          initialStatus === "connected"
        ) {
          return "transfer-join";
        } else if (
          transferStatus === "connected" &&
          initialStatus === "disconnected"
        ) {
          return "third-party-connected";
        } else if (
          transferStatus === "hold" &&
          initialStatus === "disconnected"
        ) {
          return "third-party-hold";
        }
      } else {
        //This check is due to strange behavior with Connect not deleting the contact on a missed call. This is too prevent the Appian button from displaying
        if (agentStatus === "MissedCallAgent" || agentStatus === "Default") {
          return agentStatus;
        } else {
          return activeInitialConnection.getStatus().type;
        }
      }
    } catch (e) {
      //TODO: Find a better way to deal with this
      return agentStatus;
    }
  }

  getInitialConnectionNumber(): string {
    let phoneNumber;

    try {
      phoneNumber = this.contact.getActiveInitialConnection().getEndpoint()
        .phoneNumber;
    } catch (e) {
      //TODO: Find a better way to deal with this
    }

    return phoneNumber === undefined ? "" : phoneNumber;
  }

  getThirdPartyConnectionNumber(): string {
    let phoneNumber;

    try {
      phoneNumber = this.contact
        .getSingleActiveThirdPartyConnection()
        .getEndpoint().phoneNumber;
    } catch (e) {
      //TODO: Find a better way to deal with this
    }

    return phoneNumber === undefined ? "" : phoneNumber;
  }

  getInitialConnectionStateTimer(): string {
    try {
      return this.contact.getActiveInitialConnection().getStatusDuration();
    } catch (e) {
      //TODO: Find a better way to deal with this
    }

    return "0";
  }

  getThirdPartyConnectionStateTimer(): string {
    try {
      return this.contact
        .getSingleActiveThirdPartyConnection()
        .getStatusDuration();
    } catch (e) {
      //TODO: Find a better way to deal with this
    }

    return "0";
  }

  getCCPStateTimer() {
    try {
      return this.contact.getActiveInitialConnection().getStatusDuration();
    } catch (e) {
      //TODO: Find a better way to deal with this
    }

    return this.updatedAgent ? this.updatedAgent.getStateDuration() : "0";
  }

  toggleMute() {
    this.isMuted ? this.updatedAgent.unmute() : this.updatedAgent.mute();

    this.isMuted = !this.isMuted;
  }

  isAgentMuted() {
    return this.isMuted;
  }

  toggleActiveConnections() {
    this.contact.toggleActiveConnections({
      success: () => {
        console.log("toggled connections");
      },
      failure: () => {
        console.log("failed to toggle connections");
      }
    });
  }

  conferenceConnections() {
    this.contact.conferenceConnections({
      success: () => {
        console.log("joined connections");
      },
      failure: () => {
        console.log("failed to join connections");
      }
    });
  }

  convertPhoneNumberToEndpoint(phoneNumber) {
    return connect.Endpoint.byPhoneNumber(phoneNumber);
  }

  holdAllConnections() {
    try {
      this.contact.getActiveInitialConnection().hold();
      
      //workaround for bug where only one hold will go through at a time
      setTimeout(() => {
        this.contact.getSingleActiveThirdPartyConnection().hold();
      }, 500);
    } catch (e) {
      console.log("failed to hold connections ", e);
    }
  }

  resumeAllConnections() {
    this.conferenceConnections();
  }

  hangUpInitialConnection() {
    try {
      this.contact.getActiveInitialConnection().destroy();
    } catch (e) {
      console.log("failed to hang up initial connection: ", e);
    }
  }

  hangUpThirdPartyConnection() {
    try {
      this.contact.getSingleActiveThirdPartyConnection().destroy();
    } catch (e) {
      console.log("failed to hang up third party connection: ", e);
    }
  }

  resumeInitialConnection() {
    try {
      this.contact.getActiveInitialConnection().resume();
    } catch (e) {
      console.log("failed to resume initial connection: ", e);
    }
  }

  resumeThirdPartyConnection() {
    try {
      this.contact.getSingleActiveThirdPartyConnection().resume();
    } catch (e) {
      console.log("failed to resume third party connection: ", e);
    }
  }

  holdInitialConnection() {
    try {
      this.contact.getActiveInitialConnection().hold();
    } catch (e) {
      console.log("failed to hold initial connection: ", e);
    }
  }

  holdThirdPartyConnection() {
    try {
      this.contact.getSingleActiveThirdPartyConnection().hold();
    } catch (e) {
      console.log("failed to hold initial connection: ", e);
    }
  }

  sendDigit(num: string) {
    let ccpState = this.getCCPState();

    if (ccpState === "connected" || ccpState === "transfer-1") {
      this.contact.getActiveInitialConnection().sendDigits(num);
    } else if (
      ccpState === "transfer-2" ||
      ccpState === "third-party-connected"
    ) {
      this.contact.getSingleActiveThirdPartyConnection().sendDigits(num);
    }
  }

  getDialableCountries(): Country[] {
    return _.chain(this.updatedAgent.getDialableCountries())
      .map(country => {
        return completeCountryList.find(el => {
          return el.isoCode === country;
        });
      })
      .sortBy(["name"])
      .value();
  }

  isSoftphone(): boolean {
    return this.updatedAgent.isSoftphoneEnabled();
  }

  getContactAttributes(): any {
    return this.contact ? this.contact.getAttributes() : null;
  }

  getAgentDeskPhoneNumberAndCountry(): ParameterizedPhoneNumber {
    let fullExtension: string = this.updatedAgent.getExtension();
    let dialableCountries = this.getDialableCountries();
    let trimmedPhoneNumber;
    let agentCountry;

    let usa: Country = dialableCountries.find(el => {
      return el.isoCode === "us";
    });

    //If the agent has never set an extension, return empty string and USA
    if (!fullExtension) {
      return new ParameterizedPhoneNumber("", usa);
    }

    this.getDialableCountries().forEach(country => {
      if (fullExtension.startsWith(country.code)) {
        trimmedPhoneNumber = fullExtension.substr(country.code.length);
        agentCountry = country;
      }
    });

    if (trimmedPhoneNumber && agentCountry) {
      return new ParameterizedPhoneNumber(trimmedPhoneNumber, agentCountry);
    } else {
      throw new Error("Could not parse agent extension");
    }
  }

  updateAgentConfiguration(
    softphone: boolean,
    phoneNumber?: ParameterizedPhoneNumber
  ) {
    let config = this.updatedAgent.getConfiguration();

    config.softphoneEnabled = softphone;

    if (phoneNumber) {
      config.extension = phoneNumber.country.code + phoneNumber.phoneNumber;
    }

    this.updatedAgent.setConfiguration(config, {
      success: function() {
        console.log("Successfully updated config");
      },
      failure: function() {
        console.log("Failed to update config");
      }
    });
  }

  downloadAgentLogs() {
    connect.rootLogger.download();
  }

  getAgentUserName() {
    return this.updatedAgent.getConfiguration().username;
  }
}
