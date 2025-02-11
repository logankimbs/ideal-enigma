import { AcknowledgeRedirectAction } from './actions/acknowledge-redirect.action';
import { OpenInsightModalAction } from './actions/open-insight-modal.action';
import { AppHomeOpenedEvent } from './events/app-home-opened.event';
import { TeamJoinEvent } from './events/team-join.event';
import { UserProfileChangedEvent } from './events/user-profile-changed.event';
import { SubmitInsightView } from './views/submit-insight.view';

type Constructor<T = any> = new (...args: any[]) => T;
type ListenersRegistry = {
  name: string;
  token: Constructor;
};

export const actionRegistry: ListenersRegistry[] = [
  { name: 'impactful_insights', token: AcknowledgeRedirectAction },
  { name: 'learn_more', token: AcknowledgeRedirectAction },
  { name: 'visit_dashboard', token: AcknowledgeRedirectAction },
  { name: 'open_insight_modal', token: OpenInsightModalAction },
];

export const eventRegistry: ListenersRegistry[] = [
  { name: 'app_home_opened', token: AppHomeOpenedEvent },
  { name: 'team_join', token: TeamJoinEvent },
  { name: 'user_profile_changed', token: UserProfileChangedEvent },
];

export const viewRegistry: ListenersRegistry[] = [
  { name: 'submit_insight', token: SubmitInsightView },
];
