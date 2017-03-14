require 'rails_helper'

RSpec.describe Question, type: :model do
  it { should validate_presence_of(:question_content) }
  it { should validate_presence_of(:answer) }

  describe '#question' do
    it { should_not allow_value("<p></p>").for(:question_content) }
    it { should allow_value("<p>content</p>").for(:question_content) }
  end
end
