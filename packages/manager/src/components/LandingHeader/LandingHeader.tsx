import * as React from 'react';
import Button from 'src/components/Button';
import { makeStyles, Theme } from 'src/components/core/styles';
import EntityHeader, {
  HeaderProps,
} from 'src/components/EntityHeader/EntityHeader';
import { BreadcrumbProps } from '../Breadcrumb';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    marginLeft: theme.spacing(),
    padding: 0,
  },
}));

interface Props extends Omit<HeaderProps, 'actions'> {
  extraActions?: JSX.Element;
  body?: JSX.Element;
  docsLink?: string;
  onAddNew?: () => void;
  entity?: string;
  createButtonWidth?: number;
  createButtonText?: string;
  loading?: boolean;
  breadcrumbProps?: BreadcrumbProps;
}

/**
 * This component is essentially a variant of the more abstract EntityHeader
 * component, included as its own component because it will be used in
 * essentially this form across all entity landing pages.
 */

export const LandingHeader: React.FC<Props> = (props) => {
  const classes = useStyles();

  const {
    docsLink,
    onAddNew,
    entity,
    extraActions,
    createButtonWidth,
    createButtonText,
    loading,
    breadcrumbProps,
  } = props;

  const defaultCreateButtonWidth = 152;

  const startsWithVowel = entity && /^[aeiou]/i.test(entity);

  const actions = React.useMemo(
    () => (
      <>
        {extraActions}

        {onAddNew && (
          <Button
            buttonType="primary"
            className={classes.button}
            loading={loading}
            onClick={onAddNew}
            style={{ width: createButtonWidth ?? defaultCreateButtonWidth }}
          >
            {createButtonText
              ? createButtonText
              : `Create ${startsWithVowel ? 'an' : 'a'} ${entity}`}
          </Button>
        )}
      </>
    ),
    [
      extraActions,
      onAddNew,
      classes.button,
      loading,
      createButtonWidth,
      createButtonText,
      startsWithVowel,
      entity,
    ]
  );

  return (
    <EntityHeader
      isLanding
      actions={extraActions || onAddNew ? actions : undefined}
      docsLink={docsLink}
      breadcrumbProps={breadcrumbProps}
      {...props}
    >
      {props.children}
    </EntityHeader>
  );
};

export default LandingHeader;
