FactoryGirl.define do
  factory :question do
    question { Faker::Lorem.word }
    answer { Faker::Number.number(1) }
  end
end
