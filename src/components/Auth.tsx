import { useState } from "react";
import { LocalAuthComponent } from "jazz-react-auth-local";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";
import { Field, Label } from "@/ui/fieldset";
import { Strong, Text } from "@/ui/text";

export const PrettyAuthUI: LocalAuthComponent = ({
  loading,
  logIn,
  signUp,
}) => {
  const [username, setUsername] = useState<string>("");

  return (
    <div className="contents">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-72 flex flex-col gap-8">
          <form
            className="w-72 flex flex-col gap-8"
            onSubmit={(event) => {
              event.preventDefault();

              signUp(username);
            }}
          >
            <Field>
              <Label>Display name</Label>

              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="webauthn"
                spellCheck={false}
                autoCorrect="off"
                required
              />
            </Field>

            <Button type="submit">Get started</Button>
          </form>

          <Text>
            Already have an account?{" "}
            <button onClick={logIn}>
              <Strong>Log in</Strong>
            </button>
          </Text>
        </div>
      )}
    </div>
  );
};
