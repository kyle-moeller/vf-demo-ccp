# Angular Custom CCP

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Usage Information

1. When the CCP is first loaded, the browsers pop-up blocker will need to be disabled to allow the login window to appear
2. The UI is not responsive (does not scale up/down with window resizing)
3. When adding or removing custom Agent statuses within a connect, a page refresh is required for them to show in the CCP

## Known bugs

1. When using desk phone mode, a mute button displays in the CCP. This button has no effect in desk phone mode even though it appears to mute the agent on the UI.
