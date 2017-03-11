class Question < ApplicationRecord
  validates_presence_of :question, :answer
end
