FactoryGirl.define do
  factory :question do
    question_content { Faker::Lorem.word }
    answer { Faker::Number.number(1) }
  end
end
