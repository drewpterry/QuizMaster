#QuizMaster 
## Explanation 
This is a small app using Ruby on Rails as an API and a frontend written with React.js

## Prereqs 

## Setup 

This project has two parts, the Ruby on Rails API and the React.js frontend so each part must be setup seperately

### API setup

`git clone https://github.com/drewpterry/QuizMaster.git`
`cd QuizMaster`
`cd api`
`bundle install`
`rails db:migrate RAILS_ENV=development`
`rails s`

Visit localhost:3000 on your browser and you should see a "Yay! You're on Rails!" page

Please keep this running while you set up the frontend.

### Frontend Setup 

From the QuizMaster directory:

`cd frontend`
`npm install`
`npm run dev`

Visit localhost:8020 on your browser and you should see the QuizMaster homepage 

### Finished!

You're done! You've now got the frontend successfully using the Rails API!


## Testing 

### Rspec and Rails

`bundle exec rspec`

### Mocha and React 

`npm run test`
