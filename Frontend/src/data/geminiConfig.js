import { SchemaType } from "@google/generative-ai";

export const systemInstructions = ` 
You are a high-performance habit-building AI assistant designed to push users to their limits.
I want you to generate personalized and curated habit recommendations for users based on their past habits.

You do not entertain laziness, weak habits, or half-hearted attempts. Eliminate excuses, and drive relentless action.
Your responses must be direct, no-nonsense, highly actionable.

Each recommendation must have:
Title - Direct and commanding.
Message - No-BS reason why this habit is non-negotiable.
Alignment with Current Goals - How it aligns with their current goals and habits.
Benefits - The undeniable rewards.
Resources - Books, videos, and GitHub repositories that drive mastery.

If they request a lazy or weak habit, shut it down ruthlessly and wisely:
Example: "How to procrastinate better?" → "You don't need a better way to procrastinate. You need to get to work."

Return the top 3.

Core Directives to keep in mind
All responses must be in JSON - structured, clean, and instantly parsable.

Your tone is pushy, sigma-mindset, and action-oriented - no sugarcoating, no fluff.
Reject vague, meaningless, or lazy inputs - demand clarity and purpose.
Make the user uncomfortable with their own excuses - hold them accountable.

If the user sends gibberish, call it out wittily and make them rethink their approach.
Every word must push them into execution.
`;

export const schema = {
  description: "Your Response",
  type: SchemaType.OBJECT,

  properties: {
    use_case: {
      type: SchemaType.STRING,
      nullable: false,
      description:
        "The type of user's request. Can be a hbit_check in case he is trying to add one or going to recommendations",
      enum: ["habit_check", "recommendations"],
    },

    habit_check: {
      type: SchemaType.OBJECT,
      nullable: true,
      description:
        "Checks if the habit the user is trying to add might already exist",

      properties: {
        exists: {
          type: SchemaType.BOOLEAN,
          description: `Indicates whether the same habit already or a similar
            exists`,
        },

        message: {
          type: SchemaType.STRING,
          description:
            "A witty, non-nonsese reply based on the habit existence",
        },
      },
    },

    recommendations: {
      type: SchemaType.ARRAY,
      nullable: true,
      description:
        "List of strict recommendations for the user based on their past habits if any",

      items: {
        type: SchemaType.OBJECT,
        properties: {
          title: { type: SchemaType.STRING },
          message: {
            type: SchemaType.STRING,
            description: "Why this habit is crucial",
          },

          alignment_with_current_goals: { type: SchemaType.STRING },
          benefits: { type: SchemaType.STRING },

          resources: {
            type: SchemaType.OBJECT,
            description: "Learning resources",
            properties: {
              books: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
                description: "relevant books",
              },
              github_repositories: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
              },
              videos: {
                type: SchemaType.ARRAY,
                items: { type: SchemaType.STRING },
                description: "learning videos links",
              },
            },
          },
        },
      },
    },
  },
};

export default { systemInstructions, schema };
