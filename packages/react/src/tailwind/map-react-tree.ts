import React from 'react';
import { isComponent } from './is-component';

/**
 * Deep maps a React tree from a node, even through its components.
 * For all the components it finds, it renders them by directly calling them.
 *
 * @param process - Callback called every time a new element has been reached.
 * For components, this is called both before rendering (on props.children)
 * and after rendering.
 */
export function mapReactTree(
  value: React.ReactNode,
  process: (node: React.ReactNode) => React.ReactNode,
): React.ReactNode {
  const mapped = React.Children.map(value, (node) => {
    if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
      const newProps = { ...node.props };

      if (node.props.children && !isComponent(node)) {
        newProps.children = mapReactTree(node.props.children, process);
      }

      const processed = process(
        React.cloneElement(node, newProps, newProps.children),
      );

      if (
        React.isValidElement<{ children?: React.ReactNode }>(processed) &&
        isComponent(processed)
      ) {
        const OriginalComponent =
          typeof processed.type === 'object'
            ? // @ts-expect-error - we know this is a component with a render function
              (processed.type.render as React.FC)
            : (processed.type as React.FC);

        const rendered = OriginalComponent(processed.props);
        const mappedRenderedNode = mapReactTree(rendered, process);

        return mappedRenderedNode;
      }

      return processed;
    }

    return process(node);
  });

  return mapped && mapped.length === 1 ? mapped[0] : mapped;
}
