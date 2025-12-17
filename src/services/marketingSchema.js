export const marketingSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    branding: {
      type: "array",
      description: "List of EXACTLY 4 distinct brand concepts",
      minItems: 4,
      maxItems: 4,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          name: { type: "string" },
          rationale: { type: "string" },
          slogan: { type: "string" },
        },
        required: ["name", "rationale", "slogan"],
      },
    },

    visuals: {
      type: "object",
      additionalProperties: false,
      properties: {
        primaryColor: { type: "string" },
        secondaryColor: { type: "string" },
        fontStyle: { type: "string" },
        logoConcept: { type: "string" },
        logoSvg: { type: "string" },
        moodDescription: { type: "string" },
      },
      required: [
        "primaryColor",
        "secondaryColor",
        "fontStyle",
        "logoConcept",
        "logoSvg",
        "moodDescription",
      ],
    },

    website: {
      type: "object",
      additionalProperties: false,
      properties: {
        structure: { type: "array", items: { type: "string" } },
        keyFeatures: { type: "array", items: { type: "string" } },
        seoKeywords: { type: "array", items: { type: "string" } },
        techStack: { type: "array", items: { type: "string" } },
        uiUxTips: { type: "array", items: { type: "string" } },
      },
      required: [
        "structure",
        "keyFeatures",
        "seoKeywords",
        "techStack",
        "uiUxTips",
      ],
    },

    instagram: {
      type: "array",
      description: "A 5-day content calendar",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          day: { type: "integer" },
          type: { type: "string", enum: ["Reel", "Post", "Story"] },
          title: { type: "string" },
          description: { type: "string" },
        },
        required: ["day", "type", "title", "description"],
      },
    },

    growth: {
      type: "object",
      additionalProperties: false,
      properties: {
        challengeTitle: { type: "string" },
        challengeDescription: { type: "string" },
        expectedResult: { type: "string" },
        viralIdea: { type: "string" },
        mentorAdvice: { type: "string" },
      },
      required: [
        "challengeTitle",
        "challengeDescription",
        "expectedResult",
        "viralIdea",
        "mentorAdvice",
      ],
    },

    evaluation: {
      type: "object",
      additionalProperties: false,
      properties: {
        score: { type: "integer" },
        feedback: { type: "string" },
        investmentOffer: { type: "boolean" },
        investmentPercentage: { type: "integer" },
      },
      required: [
        "score",
        "feedback",
        "investmentOffer",
        "investmentPercentage",
      ],
    },

    summary: { type: "string" },
  },

  required: [
    "branding",
    "visuals",
    "website",
    "instagram",
    "growth",
    "evaluation",
    "summary",
  ],
};
