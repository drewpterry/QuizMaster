require 'rails_helper'

RSpec.describe 'Question Serializer' do

  it 'should strip out dangerous tags in question_content' do
    dangerous_question = build(:question, question_content: "<script>alert('danger')</script>", answer: "test")
    serializer = QuestionSerializer.new(dangerous_question)
    serialization = ActiveModel::Serializer::Adapter.create(serializer)
    dangerous_question = JSON.parse(serialization.to_json)

    expect(dangerous_question['question_content']).to eql("alert('danger')")

  end
end
