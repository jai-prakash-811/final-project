'use server';

/**
 * @fileOverview AI-powered product recommendations based on user history.
 *
 * - getProductRecommendations - A function that returns product recommendations for a user.
 * - ProductRecommendationsInput - The input type for the getProductRecommendations function.
 * - ProductRecommendationsOutput - The return type for the getProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProductRecommendationsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('The user browsing history as a comma separated list of product ids.'),
  purchaseHistory: z
    .string()
    .describe('The user purchase history as a comma separated list of product ids.'),
  userId: z.string().describe('The ID of the user for whom to generate recommendations.'),
});
export type ProductRecommendationsInput = z.infer<
  typeof ProductRecommendationsInputSchema
>;

const ProductRecommendationsOutputSchema = z.object({
  productIds: z
    .array(z.string())
    .describe('An array of product IDs that are recommended for the user.'),
});
export type ProductRecommendationsOutput = z.infer<
  typeof ProductRecommendationsOutputSchema
>;

export async function getProductRecommendations(
  input: ProductRecommendationsInput
): Promise<ProductRecommendationsOutput> {
  return productRecommendationsFlow(input);
}

const productRecommendationsPrompt = ai.definePrompt({
  name: 'productRecommendationsPrompt',
  input: {schema: ProductRecommendationsInputSchema},
  output: {schema: ProductRecommendationsOutputSchema},
  prompt: `You are a shopping expert, skilled at recommending products to users based on their past browsing and purchase history.

  Given the following browsing history: {{{browsingHistory}}}
  And the following purchase history: {{{purchaseHistory}}}

  Recommend products the user might be interested in.
  Return ONLY a list of product IDs.
  Do not return any other text. Just the product ids.  No intro, explanation, or conclusion.
  The output MUST be a JSON array of strings.
  For example:
  ["product123", "product456", "product789"]
  `,
});

const productRecommendationsFlow = ai.defineFlow(
  {
    name: 'productRecommendationsFlow',
    inputSchema: ProductRecommendationsInputSchema,
    outputSchema: ProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await productRecommendationsPrompt(input);
    return output!;
  }
);
