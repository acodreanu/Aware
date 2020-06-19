import React from 'react';

import './errorBoundaryComponent.scss';

interface IErrorBoundaryComponentState {
  error?: Error;
}

class ErrorBoundaryComponent extends React.PureComponent<{}, IErrorBoundaryComponentState> {
  public constructor(props: {}) {
    super(props);
    this.state = { error: undefined };
  }

  public static getDerivedStateFromError(error: Error): IErrorBoundaryComponentState {
    return { error: error };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public componentDidCatch(error: Error, errorInfo: object) {
    //TODO ::: Add AI logging here
  }

  public render() {
    if (this.state.error) {
      return (
        <div className="ErrorBoundaryComponent">
          {/* <PlaceholderComponent
            type="sadman"
            title={`An error occured: ${this.state.error.name}`}
            secondaryText={this.state.error.message}
          /> */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryComponent;
