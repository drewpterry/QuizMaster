class Question < ApplicationRecord
  validates_presence_of :answer
  validates :question_content, presence: true
  validate :question_content_not_blank_after_tags_stripped

  # react text editor always sends <p> tags even if blank, this confirms it is truly blank without tags
  def question_content_not_blank_after_tags_stripped
    content_without_tags = ActionView::Base.full_sanitizer.sanitize(question_content)
    if content_without_tags.blank? 
      errors.add(:question_content, "can't be blank")
    end
  end
end
