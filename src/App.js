import { useState } from 'react';
import Stepper from './components/Stepper';
import StepperControl from './components/StepperControl';
import { UseContextProvider } from './contexts/StepperContext';

import Basic from './components/steps/Basic';
import Security from './components/steps/Security';
import Work from './components/steps/Work';
import Address from './components/steps/Address';
import Final from './components/steps/Final';

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ['Basic', 'Security', 'Work', 'Address', 'Final'];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Basic />;
      case 2:
        return <Security />;
      case 3:
        return <Work />;
      case 4:
        return <Address />;
      case 5:
        return <Final />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === 'next' ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div>
      <div className='mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2'>
        Stepper
        <div className='horizontal container mt-5 '>
          <Stepper steps={steps} currentStep={currentStep} />

          <div className='my-10 p-10 '>
            <UseContextProvider>{displayStep(currentStep)}</UseContextProvider>
          </div>
        </div>
        {/* navigation button */}
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </div>
  );
}

export default App;
