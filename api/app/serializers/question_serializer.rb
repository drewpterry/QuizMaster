class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :question_content, :answer

  def question_content
    ActionController::Base.helpers.sanitize(object.question_content)
  end
end
