# Todo

## Firebase

- [x] CRUD Firestore API calls
- [x] User authentication
- [ ] Email/password authentication
- [x] Modify Firestore CRUD methods to use current user
- [x] Firestore security rules
- [ ] Hosting: dev/test and production environments

## UI

- [ ] Drag n' drop items
- [ ] Default sorting of items ([localStorage](https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/)?)
- [ ] Signed out screen

## Else

- [ ] Tailwind; deprecated annotations

## Thoughts

- Refactor; Firestore supports writing documents with custom classes. Hence, the app could be more object oriented by having `TodoList` be a class, which contains several `Todo` objects. Currently, TodoList and Todo are both typescript types.
