const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const renderMarkdown = require("docusaurus/lib/core/renderMarkdown");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = (props) => (
      <div className="homeContainer">
        <div className="projectBackground" />
        <div className="projectBackgroundGradient" />
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const ProjectTitle = (props) => (
      <div className="projectTitle">
        <img src="/img/logo.svg" alt="Project Logo" width={64} />
        <h1 style={{ fontSize: "0.8em", marginBottom: "20px" }}>
          State Manager for React
        </h1>
        <h2 style={{ color: "hsla(0,0%,100%,.9)" }}>As simple as it gets</h2>
      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <ProjectTitle tagline={siteConfig.tagline} title={siteConfig.title} />
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;

    const GlobalState = () => (
      <Container padding={["top"]}>
        <div className="exampleWrapper">
          <div className="commentWrapper">
            <h2 className="codeExplanation">Global state</h2>
            <p className="codeExplanation">
              Lape is a helper library that allows using any object as state
            </p>
            <p>
              <b>lape(object)</b> - wraps an object and emits internal events
              when the object is mutated
            </p>
            <p>
              <b>connect(Component)</b> - wraps React Component to track which
              state was used in render. Rerenders the Component when the used
              state was mutated.
            </p>
          </div>
          <div
            className="codeBlock"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(`
\`\`\`js
import { lape, connect } from 'lape'

const state = lape({
  count: 0
})

const Component = () => {
  const onClick = () => state.count += 1;
  
  return <div onClick={onClick}>{state.count}</div>
}

export default connect(Component)
\`\`\`
            `),
            }}
          />
        </div>
      </Container>
    );

    const LocalState = () => (
      <Container padding={["top"]}>
        <div className="exampleWrapper">
          <div className="commentWrapper">
            <h2 className="codeExplanation">Local state</h2>
            <p className="codeExplanation">Not all state needs to be global.</p>
            <p>
              <b>useLape</b> is a <b>useState</b> replacement that works exactly
              the same as the global lape state - Component will rerender if the
              state is mutated.
            </p>
          </div>
          <div
            className="codeBlock"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(`
\`\`\`js
import { connect, useLape } from 'lape'

const Component = () => {
  const state = useLape({
    count: 1,
  });

  const onClick = () => state.count += 1;
  
  return <div onClick={onClick}>{state.count}</div>
}

export default connect(Component)
\`\`\`
            `),
            }}
          />
        </div>
      </Container>
    );

    const UndoRedo = () => (
      <Container padding={["top", "bottom"]}>
        <div className="exampleWrapper">
          <div className="commentWrapper">
            <h2 className="codeExplanation">Undo / redo</h2>
            <p>
              Everything inside <b>recordUndo</b> will be recorded as a single
              action
            </p>
            <p>
              Use <b>undo</b> and <b>redo</b> to go backwards and forwards in
              your action stack
            </p>
            <p>
              It's possible to have multiple undo/redo stacks, all functions
              accept stackId. Not sending a stackId will use the "default"
              stack.
            </p>
          </div>
          <div
            className="codeBlock"
            dangerouslySetInnerHTML={{
              __html: renderMarkdown(`
\`\`\`js
import { recordUndo, undo, redo } from 'lape'
import state from './state'

const Component = () => {
  const onClick = () => {
    recordUndo(() => {
      state.count += 1;
    }
  }
  
  return (
    <>
      <div onClick={() => undo()}>undo</div>
      <div onClick={() => redo()}>redo</div>
      <div onClick={onClick}>{state.count}</div>
    </>
  )
}

\`\`\`
            `),
            }}
          />
        </div>
      </Container>
    );

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <GlobalState />
        <LocalState />
        <UndoRedo />
      </div>
    );
  }
}

module.exports = Index;
