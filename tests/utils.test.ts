import {
  getChatContext, formatDateTime,
} from '@/utils';
import { ChatMessage } from '@/sharedState';
import { USER_SENDER, AI_SENDER } from '@/constants';

describe('getChatContext', () => {
  const userMessage0: ChatMessage = {
    message: 'Hey',
    sender: USER_SENDER,
  };

  const aiMessage0: ChatMessage = {
    message: 'Hi!',
    sender: AI_SENDER,
  };

  const userMessage1: ChatMessage = {
    message: 'Hello',
    sender: USER_SENDER,
  };

  const aiMessage1: ChatMessage = {
    message: 'Hi there!',
    sender: AI_SENDER,
  };

  const userMessage2: ChatMessage = {
    message: 'Hello again',
    sender: USER_SENDER,
  };

  const aiMessage2: ChatMessage = {
    message: 'Hi there again!',
    sender: AI_SENDER,
  };

  it('should return an empty context when chatHistory is empty', () => {
    const chatHistory: ChatMessage[] = [];
    const context = getChatContext(chatHistory, 4);
    expect(context).toEqual([]);
  });

  it('should return the correct context with chatHistory length 1', () => {
    const chatHistory: ChatMessage[] = [userMessage1];
    const context = getChatContext(chatHistory, 4);
    expect(context).toEqual([]);
  });

  it('should return the correct context with chatHistory length 2', () => {
    const chatHistory: ChatMessage[] = [aiMessage1, userMessage2];
    const context = getChatContext(chatHistory, 4);
    expect(context).toEqual([aiMessage1]);
  });

  it('should return the correct context with chatHistory length 3, user message is last', () => {
    const chatHistory: ChatMessage[] = [userMessage1, aiMessage1, userMessage2];
    const context = getChatContext(chatHistory, 4);
    expect(context).toEqual([userMessage1, aiMessage1]);
  });

  it('should return the correct context with chatHistory length 3, ', () => {
    const chatHistory: ChatMessage[] = [
      aiMessage0, userMessage1, aiMessage1
    ];
    const context = getChatContext(chatHistory, 4);
    expect(context).toEqual([
      aiMessage0, userMessage1, aiMessage1
    ]);
  });

  it('should return the correct context with chatHistory length 5, n=2', () => {
    const chatHistory: ChatMessage[] = [
      userMessage0, aiMessage0, userMessage1, aiMessage1, userMessage2,
    ];
    const context = getChatContext(chatHistory, 2);
    expect(context).toEqual([
      userMessage1, aiMessage1,
    ]);
  });

  it('should return the correct context with chatHistory length 6', () => {
    const chatHistory: ChatMessage[] = [
      userMessage0, aiMessage0, userMessage1, aiMessage1, userMessage2, aiMessage2,
    ];
    const context = getChatContext(chatHistory, 4);
    expect(context).toEqual([
      userMessage1, aiMessage1, userMessage2, aiMessage2
    ]);
  });
});

describe('formatDateTime', () => {
  it('formats the date correctly', () => {
    const now = new Date('2023-04-11T15:30:45Z');
    const formattedDate = formatDateTime(now, 'utc');
    expect(formattedDate).toBe('2023_04_11-15_30_45');
  });

  it('pads single-digit month, date, hours, minutes, and seconds with zeros', () => {
    const now = new Date('2023-01-01T01:01:01Z');
    const formattedDate = formatDateTime(now, 'utc');
    expect(formattedDate).toBe('2023_01_01-01_01_01');
  });
});

