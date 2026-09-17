import {
  Button,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { PageSwitcher } from "./PageSwitcher";

export function SampleStepper(props: { steps: string[] }) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [done, setDone] = useState<{ [step: number]: boolean }>({});

  const isComplete = Object.keys(done).length === props.steps.length;
  const isLast = currentStep === Object.keys(done).length - 1;

  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveStepRef = useRef(currentStep);
  const previousCompletedRef = useRef(done);

  // when completed changes
  useEffect(() => {
    const previousCompleted = previousCompletedRef.current;
    previousCompletedRef.current = done;

    if (isComplete) {
      resetButtonRef.current!.focus();
      return;
    }
    if (
      Object.keys(done).length === 0 &&
      Object.keys(previousCompleted).length !== 0
    ) {
      nextButtonRef.current!.focus();
    }
  }, [done, isComplete]);

  // when active changes:
  useEffect(() => {
    if (currentStep === 0 && previousActiveStepRef.current === 1) {
      nextButtonRef.current!.focus();
    }
    previousActiveStepRef.current = currentStep;
  }, [currentStep]);

  const onNext = () => {
    const newStep =
      isLast && !isComplete
        ? props.steps.findIndex((_step, i) => !(i in done))
        : currentStep + 1;
    setCurrentStep(newStep);
  };

  const onBack = () => {
    setCurrentStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onStep = (step: number) => () => {
    setCurrentStep(step);
  };

  const onComplete = () => {
    setDone({ ...done, [currentStep]: true });
    onNext();
  };

  const onReset = () => {
    setCurrentStep(0);
    setDone({});
  };

  return (
    <Stack spacing={2}>
      <Stepper nonLinear activeStep={currentStep}>
        {props.steps.map((step, i) => (
          <Step key={step} completed={done[i]}>
            <StepButton
              aria-controls="stepper-content"
              color="inherit"
              onClick={onStep(i)}
            >
              {step}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <PageSwitcher currentStep={currentStep} />

      <Stack direction="row">
        <Button onClick={onBack} disabled={currentStep === 0} color="inherit">
          Back
        </Button>

        <Button
          onClick={onNext}
          disabled={currentStep === props.steps.length - 1}
          ref={nextButtonRef}
        >
          Next
        </Button>
      </Stack>

      {isComplete && (
        <Stack>
          <Typography>All steps complete!</Typography>
          <Button ref={resetButtonRef} onClick={onReset}>
            Reset all Steps
          </Button>
        </Stack>
      )}

      {currentStep != props.steps.length && (
        <Button onClick={onComplete}>
          {Object.keys(done).length === props.steps.length - 1
            ? "finish"
            : "save step"}
        </Button>
      )}
    </Stack>
  );
}
