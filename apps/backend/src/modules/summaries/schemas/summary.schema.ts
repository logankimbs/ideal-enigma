import { z } from 'zod';

const actionSchema = z.object({
  description: z
    .string()
    .describe(
      'A comprehensive action plan that integrates all the key steps derived from the insights.'
    ),
  owners: z
    .array(z.string().describe(''))
    .describe(
      'The teams or departments responsible for executing this comprehensive action plan.'
    ),
});

const themeSchema = z.object({
  title: z
    .string()
    .describe(
      'A short, descriptive name for the theme that captures the idea.'
    ),
  objective: z
    .string()
    .describe('An objective that describes what the theme aims to achieve.'),
  summary: z
    .string()
    .describe('A brief summary of the insights grouped under this theme.'),
  insightIds: z
    .array(
      z
        .string()
        .describe(
          'The insight ID that belongs to the insights grouped under this theme.'
        )
    )
    .describe(
      'A list of insight IDs that belong to this theme, ensuring every insight is accounted for.'
    ),
  action: actionSchema.describe(
    'A combined action that includes all the most important steps to be taken for this theme.'
  ),
});

export const summarySchema = z.object({
  themes: z
    .array(themeSchema)
    .describe(
      'A structured collection of themes that group related insights and drive action for business growth.'
    ),
  conclusion: z
    .string()
    .describe(
      'A high-level, strategic conclusion that distills the most impactful insights and outlines key next steps to accelerate growth.'
    ),
});
