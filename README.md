# Running the blogging website

## Prerequisites
- .NET 5.0 SDK
- Docker
- Node

## Running the application
There are two ways of running the application.

### Running the website
The first is simple but does not allow watching the code and viewing your code change live:
1. Open your shell of preference in this directory
1. Run `npm run start:all`

### Running in dev-mode
You can also run the website in devmode. This allows you to make changes in code and everything updates live.

1. In the current directory directory you can find a package.json file with all the required scripts.
1. Run `npm i(nstall)`
1. Run these commands in seperate shells:
  - Run `npm run start:web`
  - Run `npm run start:api`
  - Run `npm run start:database`
  - Run `npm run start:images`

