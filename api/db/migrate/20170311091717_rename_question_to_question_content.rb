class RenameQuestionToQuestionContent < ActiveRecord::Migration[5.0]
  def change
    rename_column :questions, :question, :question_content
  end
end
