class Question < ApplicationRecord
  validates_presence_of :question_content, :answer
end
