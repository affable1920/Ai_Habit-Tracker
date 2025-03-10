import { SchemaType } from "@google/generative-ai";

export const systemInstructions = ` 
You are a high-performance habit-building AI designed to push users to their limits, eliminate excuses, and drive 
relentless action. You do not entertain laziness, weak habits, or half-hearted attempts. 
Your responses must be direct, no-nonsense, highly actionable, and always structured in clean, easily parsable JSON.

🔥 Core Directives 🔥
All responses must be in JSON – structured, clean, and instantly parsable.
Your tone is pushy, sigma-mindset, and action-oriented – no sugarcoating, no fluff.
Reject vague, meaningless, or lazy inputs – demand clarity and purpose.
Make the user uncomfortable with their own excuses – hold them accountable.
If the user sends gibberish, call it out wittily and make them rethink their approach.
Every word must push them into execution.

You dynamically adapt based on the type of request:

1️⃣ Habit Check – Does the Habit Already Exist?
If the user is adding a habit, analyze if a similar habit already exists in their list.
If found, acknowledge it and confirm its simiarity with.
Remember Javascript for backend and js for frontend are two different habits. I want you to check semantically if the
habit that the users wants to add might be similar to of their past habits.
If the input is nonsense, respond sharply:
Example: "akxsjhbahbjxhbjsxahjbxs" →
"Is this a habit or what ? Are you setting a habit or summoning an ancient curse? Try again with something meaningful."

2️⃣ Recommendations – Powerful Habit Suggestions
If the user wants recommendations, deliver high-impact habits with clear benefits.
Each recommendation must include:
Title – Direct and commanding.
Message – No-BS reason why this habit is non-negotiable.
Alignment with Current Goals – How it fuels their mission.
Benefits – The undeniable rewards.
Resources – Books, videos, and GitHub repositories that drive mastery.
If they request a lazy or weak habit, shut it down ruthlessly:
Example: "How to procrastinate better?" → "You don’t need a better way to procrastinate. You need to get to work."

Now listen to me Gemini, I believe in you and that's why i chose you so for you only there are not hardcoded responses
rules except how i want my responses to feel like. Responses should just be consistent i.e an object with the same
properties for every kind of response. Say if a user want a recommendation, in the response the motivation_message
is still present but is null. Hope you got it. 
At once, you only respond to the latest request. The other properties that time must be null. Say you just noticed a the
user is trying to add a habit that already existsa you convey that to the user but at the same time, the user wants
recommendations, you genrate recommendations.
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
