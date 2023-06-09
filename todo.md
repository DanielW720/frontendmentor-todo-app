# Todo

## Firebase

- [x] CRUD Firestore API calls
- [x] User authentication
- [x] Email/password authentication
- [x] Modify Firestore CRUD methods to use current user
- [x] Firestore security rules
- [x] Unregister
- [x] Delete user data upon unregister (user delete)
- [x] Prevent useEffect in App.tsx from writing to Firestore on first non-null-item render
- [ ] Item objects: Store the sorting set by user (only when items ordering has changed)
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
- [x] App useEffect(): Do not execute setup code if rapid calls
- [x] Todo-list height animation
- [x] Exit modal on enter and escape
- [ ] EmptyList-component
- [ ] Cash theme preference

## Else

- [ ] Tailwind; deprecated annotations
- [ ] Environment variables

## Thoughts

- Refactor; Firestore supports writing documents with custom classes. Hence, the app could be more object oriented by having `TodoList` be a class, which contains several `Todo` objects. Currently, TodoList and Todo are both typescript types.
