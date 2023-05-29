import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "“A reader lives a thousand lives before he dies . . . The man who never reads lives only one.” - George R.R. Martin",
          "“Until I feared I would lose it, I never loved to read. One does not love breathing.” - Harper Lee",
          "“Never trust anyone who has not brought a book with them.” - Lemony Snicket",
          "“You can never get a cup of tea large enough or a book long enough to suit me.” - C.S. Lewis",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 70,
        
      }}
    />
  );
}

export default Type;
