import { MillisToTimePipe } from './millis-to-time.pipe';

describe('MillisToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new MillisToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
