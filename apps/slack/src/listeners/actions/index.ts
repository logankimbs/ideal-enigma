import { App } from '@slack/bolt';
import {
  IMPACTFUL_INSIGHTS,
  LEARN_MORE,
  OPEN_INSIGHT_MODAL,
  VISIT_DASHBOARD,
} from '../../constants';
import { impactfulInsights, learnMore, visitDashboard } from './buttonRedirect';
import openInsightModal from './openInsightModal';

const register = (app: App) => {
  app.action(OPEN_INSIGHT_MODAL, openInsightModal);
  app.action(VISIT_DASHBOARD, visitDashboard);
  app.action(LEARN_MORE, learnMore);
  app.action(IMPACTFUL_INSIGHTS, impactfulInsights);
};

export default { register };
