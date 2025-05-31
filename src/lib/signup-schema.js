import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    phone: z
      .string()
      .min(10, "Phone number is required")
      .max(10, "Phone number have to be 10 digits"),

    residenceType: z.enum(["Owned", "Rented", "Other"], {
      errorMap: () => ({ message: "Residence type is required" }),
    }),
    monthlyIncome: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number({ invalid_type_error: "Monthly income is required" })
        .min(0, "Monthly income cannot be negative")
    ),
    previousLoan: z.boolean(),
    loanAmount: z.preprocess(
      (val) =>
        val === "" || val === null || val === undefined
          ? undefined
          : Number(val),

      z.number({ invalid_type_error: "Loan amount is required" }).optional()
    ),

    maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"], {
      errorMap: () => ({ message: "Marital status is required" }),
    }),
    numberOfDependents: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number({ invalid_type_error: "Number of dependents is required" })
        .min(0, "Number of dependents cannot be negative")
    ),

    city: z.string(),
    state: z.string(),
    zipCode: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z
        .number()
        .optional()
        .refine(
          (val) =>
            val === undefined ||
            (val.toString().length >= 3 && val.toString().length <= 5),
          {
            message: "Zip code must be from 3 to 5 digits",
          }
        )
    ),
  })
  // if previousLoan is true, loanAmount is required and must be greater than 0
  .superRefine((data, ctx) => {
    if (data.previousLoan) {
      console.log("previousLoan is true");
      if (typeof data.loanAmount !== "number" || data.loanAmount <= 0) {
        ctx.addIssue({
          path: ["loanAmount"],
          code: z.ZodIssueCode.custom,
          message: "Loan amount must be greater than 0",
        });
      }
    } else {
      console.log("previousLoan is false");
    }
  });
