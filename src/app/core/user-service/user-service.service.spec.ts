import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from './user-service.service';

describe('UserService', () => {

  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [UserService]
    });

    userService = TestBed.get(UserService);
  });

  afterEach(() => {
    userService = null;
  });

  it('User Service unit testing started...', () => {
    expect(userService).toBeTruthy();
  });

  it('should return the list of users and their corresponding data', () => {
    const userResponseData: Array<{name: string, email: string, password: string}> = [
      { name: 'Aakash', email: 'test@test.test', password: 'test@123' },
      { name: 'Sumit', email: 'sumit@test.test', password: 'test@123' },
      { name: 'Ashish', email: 'ashish@test.test', password: 'test@123' }
    ];

    const response: Array<{name: string, email: string, password: string}> = userService.getUserData();
    expect(response).toEqual(userResponseData);
  });

  it('should set a new user', () => {
    const name = 'test_user';
    const email = 'test@email.user';
    const password = 'test1234';

    const initialArraySize = userService.getUserData().length;
    userService.setUserData(name, email, password);
    const finalArraySize = userService.getUserData().length;

    expect(finalArraySize).toBeGreaterThan(initialArraySize);
  });

  it('should update user-name', () => {
    const newUserName = 'aakash';
    const userEmail = 'test@test.test';
    let nameAfterUpdate = '';
    let nameBeforeUpdate = '';

    const initialUserData: Array<{name: string, email: string, password: string}> = userService.getUserData();
    const indexBefore = initialUserData.findIndex(u => u.email === userEmail);
    if (indexBefore >= 0) {
      nameBeforeUpdate = initialUserData[indexBefore].name;
    }

    userService.updateUserName(newUserName, userEmail);

    const userData: Array<{name: string, email: string, password: string}> = userService.getUserData();
    const indexAfter = userData.findIndex(u => u.email === userEmail);
    if (indexAfter >= 0) {
      nameAfterUpdate = userData[indexAfter].name;
    }

    expect(nameBeforeUpdate).toBe('Aakash');
    expect(nameAfterUpdate).toBe(newUserName);
  });

  it('should update user-email', () => {
    const newUserEmail = 'test2@tes.tes';
    const currentUserEmail = 'test@test.test';
    let emailAfterUpdate = '';
    let emailBeforeUpdate = '';

    const initialUserData: Array<{name: string, email: string, password: string}> = userService.getUserData();
    const indexBefore = initialUserData.findIndex(u => u.email === currentUserEmail);
    if (indexBefore >= 0) {
      emailBeforeUpdate = initialUserData[indexBefore].email;
    }

    userService.updateUserEmail(currentUserEmail, newUserEmail);

    const userData: Array<{name: string, email: string, password: string}> = userService.getUserData();
    const indexAfter = userData.findIndex(u => u.email === newUserEmail);
    if (indexAfter >= 0) {
      emailAfterUpdate = userData[indexAfter].email;
    }

    expect(emailBeforeUpdate).toBe(currentUserEmail);
    expect(emailAfterUpdate).toBe(newUserEmail);
  });

  it('should update user-password', () => {
    const newUserPassword = 'aakash@123';
    const userEmail = 'test@test.test';
    let passwordAfterUpdate = '';
    let passwordBeforeUpdate = '';

    const initialUserData: Array<{name: string, email: string, password: string}> = userService.getUserData();
    const indexBefore = initialUserData.findIndex(u => u.email === userEmail);
    if (indexBefore >= 0) {
      passwordBeforeUpdate = initialUserData[indexBefore].password;
    }

    userService.updateUserPassword(userEmail, newUserPassword);
    const userData: Array<{name: string, email: string, password: string}> = userService.getUserData();
    const indexAfter = userData.findIndex(u => u.email === userEmail);
    if (indexAfter >= 0) {
      passwordAfterUpdate = userData[indexAfter].password;
    }

    expect(passwordBeforeUpdate).toBe('test@123');
    expect(passwordAfterUpdate).toBe(newUserPassword);
  });

  it('should delete given user', () => {
    const currentUserEmail = 'test@test.test';

    const initialArraySize = userService.getUserData().length;
    userService.deleteUserData(currentUserEmail);
    const finalArraySize = userService.getUserData().length;

    expect(finalArraySize).toBeLessThan(initialArraySize);
  });
});
