# Todo

## Firebase

- [x] CRUD Firestore API calls
- [x] User authentication
- [x] Email/password authentication
- [x] Modify Firestore CRUD methods to use current user
- [x] Firestore security rules
- [ ] Fix capital letters in first name and last name upon registration with email (cloud functions?)
- [ ] Auth state persistence
- [ ] Email link authentication
- [ ] [Differentiating email/password from email link](https://firebase.google.com/docs/auth/web/email-link-auth?hl=en&authuser=0)
- [ ] Unregister
- [ ] Hosting: dev/test and production environments

## UI

- [x] Loginform/Registerform
- [x] Form input text color
- [x] User display name not showing when creating user and signing in for the first time
- [ ] Firebase-error modal (couldn't create/login user)
- [ ] Loading screen when refreshing
- [ ] Default sorting of items ([localStorage](https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/)?)
- [ ] Drag n' drop items

## Else

- [ ] Tailwind; deprecated annotations

## Thoughts

- Refactor; Firestore supports writing documents with custom classes. Hence, the app could be more object oriented by having `TodoList` be a class, which contains several `Todo` objects. Currently, TodoList and Todo are both typescript types.
