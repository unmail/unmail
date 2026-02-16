import { Body } from '../components/body';
import { Button } from '../components/button';
import { Container } from '../components/container';
import { Heading } from '../components/heading';
import { Hr } from '../components/hr';
import { Img } from '../components/img';
import { Link } from '../components/link';
import { Preview } from '../components/preview';
import { Text } from '../components/text';

/**
 * Components that render standard HTML elements and should be treated as
 * elements (not traversed through) by the Tailwind tree mapper.
 */
const componentsToTreatAsElements: React.ReactElement['type'][] = [
  Body,
  Button,
  Container,
  Heading,
  Hr,
  Img,
  Link,
  Preview,
  Text,
];

export const isComponent = (
  element: React.ReactElement,
): element is React.ReactElement<unknown, React.FC<unknown>> => {
  return (
    (typeof element.type === 'function' ||
      // @ts-expect-error - we know this is a component that may have a render function
      element.type.render !== undefined) &&
    !componentsToTreatAsElements.includes(element.type)
  );
};
