import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Spacer, useToast } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { RPCContext } from "../../driver-poc/rpc";
import { Candidate, ConsentStatus } from "../../driver-poc/types";

interface ConsentProps {
  allowRequest: boolean;
  candidate: Candidate;
}

export default function Consent ({ allowRequest, candidate }: ConsentProps) {
  const rpc = useContext(RPCContext);
  const toast = useToast();
  const [isPending, setPending] = useState(false);

  if (isPending) return (
    <Alert borderRadius="10px" w="100%" status='warning'>
      <AlertIcon />
      <Box>
        <AlertTitle>Consent pending ...</AlertTitle>
        <AlertDescription>Consent request was sent on {new Date().toISOString()}</AlertDescription><br />
      </Box>
    </Alert>
  )

  if (!candidate.consent || candidate.consent.status == ConsentStatus.NOT_GRANTED) {
    return (
      <Alert borderRadius="10px" w="100%" status='error'>
        <AlertIcon />
        <Box>
          <AlertTitle>No consent granted!</AlertTitle>
          <AlertDescription>No consent has been granted yet!</AlertDescription><br />
          <Button variant="link" textColor="black"><u>Show history</u></Button>
        </Box><Spacer />
        {allowRequest &&
        <Button
          onClick={() => {
            const examplePromise = new Promise(async (resolve, reject) => {
              const req = await rpc.requestConsent(candidate);
              req?resolve(true):reject();
            });
            toast.promise(examplePromise, {
              success: { title: 'Request sent', description: 'Consent request has been sent!' },
              error: { title: 'Request failed', description: 'Something went wrong! Please try again' },
              loading: { title: 'Requesting consent', description: 'Please wait ...', containerStyle: {color: "white"}}});
              setPending(true);

            setTimeout(() => {
                window.location.reload();
            }, 3000)
          }
        }
          backgroundColor={"white"}
          variant="outline"
        >
        Request consent</Button>
        }
      </Alert>
    );
  } else {
    return (
      <Alert borderRadius="10px" w="100%" status='success'>
        <AlertIcon />
        <Box>
          <AlertTitle>Consent granted!</AlertTitle>
          <AlertDescription>Consent granted via digital consent (opt-in) on {candidate.consent.date}</AlertDescription><br />
          <Button variant="link" textColor="black"><u>Show history</u></Button>
        </Box><Spacer />
      </Alert>
    );
  }
}
