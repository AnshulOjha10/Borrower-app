import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/lib/signup-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Controller } from "react-hook-form";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      previousLoan: false,
    },
  });

  const previousLoan = watch("previousLoan");

  useEffect(() => {
    if (!previousLoan) {
      setValue("loanAmount", undefined);
    }
  }, [previousLoan, setValue]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Signup failed");
      return res.json();
    },
  });

  const onSubmit = (data) => {
    console.log("from data: ", data);
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white p-6 relative overflow-hidden">
      {/* Floating illustration */}
      <motion.img
        src="https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif"
        alt="Illustration"
        className="absolute right-4 bottom-4 w-32 md:w-40 opacity-60"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg space-y-4 z-10"
      >
        <h2 className="text-2xl font-bold text-purple-700 text-center">
          Create Your Account
        </h2>

        {/* Name */}
        <div>
          <Input
            placeholder="Name"
            {...register("name")}
            className={`${
              errors.name ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            placeholder="Email"
            {...register("email")}
            className={`${
              errors.email ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}
        </div>

        {/* Phone */}
        <div>
          <Input
            placeholder="Phone"
            {...register("phone")}
            className={`${
              errors.phone ? "border-red-500 placeholder:text-red-500" : ""
            }`}
          />
          {errors.phone && (
            <span className="text-red-500 text-xs">{errors.phone.message}</span>
          )}
        </div>

        {/* Residence Type */}
        <div>
          <Controller
            control={control}
            name="residenceType"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger
                  className={`${
                    errors.residenceType ? "border-red-500" : ""
                  } w-full`}
                >
                  <SelectValue placeholder="Residence Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owned">Owned</SelectItem>
                  <SelectItem value="Rented">Rented</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.residenceType && (
            <span className="text-red-500 text-xs">
              {errors.residenceType.message}
            </span>
          )}
        </div>

        {/* Monthly Income */}
        <div>
          <Input
            type="number"
            placeholder="Monthly Income"
            {...register("monthlyIncome", { valueAsNumber: true })}
            className={`${
              errors.monthlyIncome
                ? "border-red-500 placeholder:text-red-500"
                : ""
            }`}
          />
          {errors.monthlyIncome && (
            <span className="text-red-500 text-xs">
              {errors.monthlyIncome.message}
            </span>
          )}
        </div>

        {/* Previous Loan */}
        <div>
          <Controller
            control={control}
            name="previousLoan"
            defaultValue="No"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Previous Loan</label>
                <RadioGroup
                  onValueChange={(val) => field.onChange(val === "Yes")}
                  value={field.value ? "Yes" : "No"}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="Yes" id="r-yes" />
                    <Label htmlFor="r-yes" className="text-muted-foreground">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="No" id="r-no" />
                    <Label htmlFor="r-no" className="text-muted-foreground">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          />
          {errors.previousLoan && (
            <span className="text-red-500 text-xs">
              {errors.previousLoan.message}
            </span>
          )}
        </div>

        {/* Loan Amount */}
        <div>
          {previousLoan && (
            <>
              <Input
                type="number"
                placeholder="Loan Amount"
                {...register("loanAmount", { valueAsNumber: true })}
                className={`${
                  errors.loanAmount
                    ? "border-red-500 placeholder:text-red-500"
                    : ""
                }`}
              />
              {errors.loanAmount && (
                <span className="text-red-500 text-xs">
                  {errors.loanAmount.message}
                </span>
              )}
            </>
          )}
        </div>

        {/* Marital Status */}
        <div>
          <Controller
            control={control}
            name="maritalStatus"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || ""}>
                <SelectTrigger
                  className={`${
                    errors.maritalStatus ? "border-red-500" : ""
                  } w-full`}
                >
                  <SelectValue placeholder="Marital Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Married">Married</SelectItem>
                  <SelectItem value="Divorced">Divorced</SelectItem>
                  <SelectItem value="Widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.maritalStatus && (
            <span className="text-red-500 text-xs">
              {errors.maritalStatus.message}
            </span>
          )}
        </div>

        {/* Number of Dependents */}
        <div>
          <Input
            type="number"
            placeholder="Number of Dependents"
            {...register("numberOfDependents", { valueAsNumber: true })}
            className={`${
              errors.numberOfDependents
                ? "border-red-500 placeholder:text-red-500"
                : ""
            }`}
          />
          {errors.numberOfDependents && (
            <span className="text-red-500 text-xs">
              {errors.numberOfDependents.message}
            </span>
          )}
        </div>

        {/* Address */}
        <div>
          <Label className="text-sm font-medium">Address</Label>
          <section className="flex justify-between items-center gap-2">
            {/* City */}
            <Input
              placeholder="City"
              {...register("city")}
              className={`${
                errors.city ? "border-red-500 placeholder:text-red-500" : ""
              }`}
            />

            {/* State */}
            <Input
              placeholder="State"
              {...register("state")}
              className={`${
                errors.state ? "border-red-500 placeholder:text-red-500" : ""
              }`}
            />

            {/* Zip Code */}
            <Input
              type="number"
              placeholder="Zip Code"
              {...register("zipCode")}
              className={`${
                errors.zipCode ? "border-red-500 placeholder:text-red-500" : ""
              }`}
            />
          </section>
          <div className="flex flex-col ">
            {errors.city && (
              <span className="text-red-500 text-xs">
                {errors.city.message}
              </span>
            )}
            {errors.state && (
              <span className="text-red-500 text-xs">
                {errors.state.message} state err
              </span>
            )}
            {errors.zipCode && (
              <span className="text-red-500 text-xs">
                {errors.zipCode.message}
              </span>
            )}
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-2"
          >
            Sign Up
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
}
