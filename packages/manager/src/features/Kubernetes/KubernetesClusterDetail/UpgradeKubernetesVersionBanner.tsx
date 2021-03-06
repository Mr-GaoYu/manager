import * as React from 'react';
import Button from 'src/components/Button';
import Paper from 'src/components/core/Paper';
import { makeStyles, Theme } from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import Grid from 'src/components/Grid';
import { useKubernetesVersionQuery } from 'src/queries/kubernetesVersion';
import { getNextVersion } from '../kubeUtils';
import UpgradeVersionModal from '../UpgradeVersionModal';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: '1rem',
    borderLeft: `solid 6px ${theme.color.green}`,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(),
  },
  upgradeMessage: {
    marginLeft: theme.spacing(),
  },
}));

interface Props {
  clusterID: number;
  clusterLabel: string;
  currentVersion: string;
}

export type CombinedProps = Props;

export const UpgradeKubernetesVersionBanner: React.FC<Props> = (props) => {
  const { clusterID, clusterLabel, currentVersion } = props;
  const classes = useStyles();
  const { data: versions } = useKubernetesVersionQuery();
  const nextVersion = getNextVersion(currentVersion, versions ?? []);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <>
      {nextVersion ? (
        <Paper className={classes.root}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item>
              <Typography className={classes.upgradeMessage}>
                A new version of Kubernetes is available ({nextVersion}).
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={() => setDialogOpen(true)} buttonType="primary">
                Upgrade Version
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ) : null}
      <UpgradeVersionModal
        clusterID={clusterID}
        clusterLabel={clusterLabel}
        currentVersion={currentVersion}
        nextVersion={nextVersion ?? ''}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default React.memo(UpgradeKubernetesVersionBanner);
