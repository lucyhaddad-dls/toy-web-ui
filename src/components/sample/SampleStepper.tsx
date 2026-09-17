import {
  Box,
  Button,
  Fade,
  Popover,
  Stack,
  Step,
  StepButton,
  Stepper,
  TextField,

} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { PageSwitcher } from "./PageSwitcher";
import { SampleContext } from "../../context/SampleContext";

// todo: remove the "save step" 

export function SampleStepper(props: { steps: string[] }) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [done, setDone] = useState<{ [step: number]: boolean }>({});

  const {focusedSample, setFocusedSample, getSample, addToSampleList, replaceSampleValues} = useContext(SampleContext)

  const isLast = currentStep === Object.keys(done).length - 1;

  const resetButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveStepRef = useRef(currentStep);

  const [saveOpen, setSaveOpen] = useState<boolean>(false) 
  const [savePosition, setSavePosition] = useState<null|HTMLElement>(null)

  // when active changes:
  useEffect(() => {
    if (currentStep === 0 && previousActiveStepRef.current === 1) {
      nextButtonRef.current!.focus();
    }
    previousActiveStepRef.current = currentStep;
  }, [currentStep]);

  const onNext = () => {
    const newStep =
      isLast
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

  const onComplete = (event:React.MouseEvent<HTMLElement>) => {
    // rename sample.
    setDone({ ...done, [currentStep]: true });
    // open sample name box.
      setSaveOpen(!saveOpen)
      setSavePosition(event.currentTarget)
  };

  const saveNew = (sampleName:string) => {
    addToSampleList({name:sampleName, values:focusedSample.values})
    setFocusedSample({name:sampleName, values:focusedSample.values})
  }

  const ovewriteSample = () => {
    replaceSampleValues(focusedSample.name, focusedSample.values)
    setFocusedSample(getSample(focusedSample.name))
  }

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

                <Button ref={resetButtonRef} onClick={onReset}
          disabled={currentStep === 0}>
            Back to start
          </Button>

      {currentStep == props.steps.length -1 && (
        <Button 
        onClick={(event:React.MouseEvent<HTMLElement> ) => 
        onComplete(event)}
          >
         Save as New Sample
        </Button>
      )}
      {currentStep == props.steps.length -1 && focusedSample.name != "" &&(
        <div>
        <Button 
        onClick={(event:React.MouseEvent<HTMLElement> ) => 
        onComplete(event)}>
         Save as New Sample
        </Button>
        <Button onClick={() => 
          {setDone({ ...done, [currentStep]: true }); ovewriteSample()}}>
          Save Changes
        </Button>
        </div>
      )}
      </Stack>

        <Popover id="save"
        open={saveOpen}
        anchorEl={savePosition}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() =>{setSaveOpen(false); setSavePosition(null)}}>
        <Fade in={saveOpen}>
            <Box sx={{visibility:saveOpen==true?"visible":"hidden"}}>
                <TextField
                label="Sample Name: "
                onKeyUp={(event) => {
                if (event.key == "Enter") {
                  setSaveOpen(false); setSavePosition(null)
                  const val = event.target as HTMLTextAreaElement;
                  
                  if (val.value != "") {
                    saveNew(val.value)
                    event.preventDefault(); }
                  }
                }
              }
                />
            </Box>
        </Fade>
        </Popover>
  
    </Stack>
  );
}
