require 'rails_helper'

RSpec.describe 'Question API', type: :request do
  # initialize test data 
  let!(:question) { create_list(:question, 10) }
  let(:question_id) { question.first.id }
  before(:all) do
    base_url = 'api' 
  end

  # Test suite for GET /questions
  describe 'GET api/questions' do
    # make HTTP get request before each example
    before { get 'api/questions' }

    it 'returns questions' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /questions/:id
  describe 'GET /questions/:id' do
    before { get "api/questions/#{question_id}" }

    context 'when the record exists' do
      it 'returns the question' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(question_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:question_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Question/)
      end
    end
  end

  # Test suite for POST /questions
  describe 'POST /questions' do
    let(:valid_attributes) { { question_content: 'Learn Elm', answer: '1' } }

    context 'when the request is valid' do
      before { post '/questions', params: valid_attributes }

      it 'creates a question' do
        expect(json['question_content']).to eq('Learn Elm')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/questions', params: { question_content: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(json['message'])
          .to match("Validation failed: Answer can't be blank")

      end
    end
  end

  # Test suite for PUT /questions/:id
  describe 'PUT /questions/:id' do
    let(:valid_attributes) { { question_content: 'Shopping' } }

    context 'when the record exists' do
      before { put "/questions/#{question_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /questions/:id
  describe 'DELETE /questions/:id' do
    before { delete "/questions/#{question_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
