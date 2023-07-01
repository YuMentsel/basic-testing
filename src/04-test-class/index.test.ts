import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const INIT_BALANCE = 100;
  const NEW_BALANCE = 250;

  const myAccount = getBankAccount(INIT_BALANCE);
  const otherAccount = getBankAccount(200);

  test('should create account with initial balance', () => {
    const myBalance = myAccount.getBalance();
    expect(myBalance).toBe(INIT_BALANCE);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const myBalance = myAccount.getBalance();
    expect(() => myAccount.withdraw(150)).toThrowError(
      new InsufficientFundsError(myBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const myBalance = myAccount.getBalance();
    expect(() => myAccount.transfer(150, otherAccount)).toThrowError(
      new InsufficientFundsError(myBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => myAccount.transfer(150, myAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(myAccount.deposit(300).getBalance()).toBe(400);
  });

  test('should withdraw money', () => {
    expect(myAccount.withdraw(200).getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    expect(myAccount.transfer(150, otherAccount).getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await myAccount.fetchBalance();
    if (balance !== null) expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(myAccount, 'fetchBalance').mockResolvedValueOnce(NEW_BALANCE);
    await myAccount.synchronizeBalance();
    const myBalance = myAccount.getBalance();
    expect(myBalance).toBe(NEW_BALANCE);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(myAccount, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(myAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
