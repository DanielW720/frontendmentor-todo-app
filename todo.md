# Todo

## Firebase

- [x] CRUD Firestore API calls
- [x] User authentication
- [x] Email/password authentication
- [x] Modify Firestore CRUD methods to use current user
- [x] Firestore security rules
- [x] Unregister
- [x] Delete user data upon unregister (user delete)
- [x] Item objects: Store the sorting set by user
- [ ] Fix capital letters in first name and last name upon registration with email (cloud functions?)
- [ ] Auth state persistence
- [ ] Email link authentication
- [ ] [Differentiating email/password from email link](https://firebase.google.com/docs/auth/web/email-link-auth?hl=en&authuser=0)
- [ ] Hosting: dev, test and production environments

## UI

- [x] Loginform/Registerform
- [x] Form input text color
- [x] User display name not showing when creating user and signing in for the first time
- [x] Firebase-error modal (couldn't create/login user)
- [x] Dropdown/Side-menu for signing out or unregistering
- [x] Loading screen when refreshing
- [x] React Context: Persist user display name on page reload
- [x] Prompt user for re-authentication upon pressing "unregister"
- [x] Drag n' drop items
- [ ] App useEffect(): Do not execute setup code if rapid calls
- [ ] EmptyList-component
- [ ] Todo-list height animation
- [ ] Cash theme preference

## Else

- [ ] Tailwind; deprecated annotations
- [ ] Environment variables

## Thoughts

- Refactor; Firestore supports writing documents with custom classes. Hence, the app could be more object oriented by having `TodoList` be a class, which contains several `Todo` objects. Currently, TodoList and Todo are both typescript types.
