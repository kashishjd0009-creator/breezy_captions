export const MOCK_CAPTION_RESPONSE = `## CAPTION

Sunday mornings hit different when it's just you, a warm cup of coffee, and a book that pulls you in completely. No rush, no agenda — just pure, slow living at its best. ☕📖 What's on your reading list this weekend?

## HASHTAGS

#SundayMorning #CoffeeLover #SlowLiving #BookstagramVibes #MorningRitual #CozyCorner #ReadingTime #CoffeeAndBooks #WeekendMood #MindfulMorning #CozySunday #BookNerd #MorningCoffee`;

export async function getMockStream(): Promise<ReadableStream<string>> {
  const text = MOCK_CAPTION_RESPONSE;
  const words = text.split(" ");

  return new ReadableStream<string>({
    async start(controller) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      for (const word of words) {
        controller.enqueue(word + " ");
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
      controller.close();
    },
  });
}
