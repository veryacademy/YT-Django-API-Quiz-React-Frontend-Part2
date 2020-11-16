import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ConnectApi from "../api/ConnectApi";
import Header from "./framework/Header";
import Footer from "./framework/Footer";

// MaterialUI
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  correct: {
    color: "blue",
  },
}));

export const RandomQuiz = () => {
  const classes = useStyles();
  const { topic } = useParams();
  const API_URL = "http://127.0.0.1:8000/quiz/r/" + topic;
  const [dataState] = ConnectApi(API_URL);
  const a = dataState.data.flatMap((q) => q.answer);
  const ac = a.length;
  const [answer, setAnswer] = useState({});
  const [answerCheck, setAnswerCheck] = useState();

  useEffect(() => {
    if (Object.keys(answer).length === 0) {
      setAnswer(createInitalAnswers());
    }
  }, [answer]);

  const handleSelection = (e) => {
    setAnswer({ ...answer, [e.target.value]: e.target.checked });
  };

  const createInitalAnswers = () => {
    let z = a.flatMap((obj) => obj.id);
    var object = {};
    for (var x = 0; x < ac; x++) {
      object[z[x]] = false;
    }
    return object;
  };

  const checkAnswer = (e) => {
    e.preventDefault();

    let n = a.map((obj) => obj.is_right);
    let y = { ...n };

    function arrayEquals(o, p) {
      return (
        Array.isArray(o) &&
        Array.isArray(p) &&
        o.length === p.length &&
        o.every((val, index) => val === p[index])
      );
    }

    let o = Object.values(y);
    let p = Object.values(answer);
    if (arrayEquals(o, p)) {
        setAnswerCheck(true);
    } else {
        setAnswerCheck(false);
    }
  };

  function refreshPage() {
    window.location.reload(false);
  }

  function Result() {
    if (answerCheck === true) {
      return (
        <Alert severity="success">
          <AlertTitle>Corrent Answer</AlertTitle>
          Well done you got it right —{" "}
          <Link href="#" variant="body2" onClick={refreshPage}>
            {"Next Question"}
          </Link>
        </Alert>
      );
    } else if (answerCheck === false) {
      return (
        <Alert severity="error">
          <AlertTitle>Wrong Answer</AlertTitle>
          Please try again!
        </Alert>
      );
    } else {
      return <React.Fragment></React.Fragment>;
    }
  }

  return (
    <React.Fragment>
      <Header />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          {dataState.data.map(({ title, answer }, i) => (
            <div key={i}>
              <Typography component="h1" variant="h5">
                {title}
              </Typography>
              {answer.map(({ answer_text, id }) => (
                <RadioGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={id}
                        color="primary"
                        onChange={handleSelection}
                      />
                    }
                    label={answer_text}
                  />
                </RadioGroup>
              ))}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={checkAnswer}
              >
                Submit Answer
              </Button>
              <Result />
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default RandomQuiz;
