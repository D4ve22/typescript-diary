# TypeScript Diary

A diary application using TypeScript and React

## Steps to run the project locally

### 1. Clone the repository and navigate to the project folder

```bash
git clone https://github.com/D4ve22/typescript-diary.git
cd typescript-diary
```

### 2. Install all dependencies

```bash
npm install
```

### 3. Run the project locally by starting the development server

```bash
npm run dev
```

## Implemented Features

This project was developed as a semester project for the course "Introduction to TypeScript" at the Brandenburg University of Applied Sciences.

**All** of the **mandatory** and **optional features** of the assignment specification were implemented, which includes the following requirements:

### Mandatory Features:

1. Display of all diary entries (most recent entries first)
2. Creation and display of new diary entries
3. Marking and filtering important diary entries (favorites)
4. Text preview in the diary overview for entries longer than 250 characters

### Optional Features

1. Persistent storage of diary entries
2. Manually set creation date
3. Tagging entries with keywords
4. Lazy loading of diary entries

## Tests

This project also contains tests for the following featues:

- **Mandatory Feature 1**: Tests if entries are sorted by date (newest first) and have required attributes
- **Mandatory Feature 3**: Tests if entries can be marked as favorites
- **Optional Feature 1**: Tests if entries are saved persistently in the localStorage and can be retrieved from there

\
These tests can be run using:

```bash
npm test
```
