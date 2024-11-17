'use client';

import { useContext } from 'react';
import { Heading, Subheading } from '../../components/heading';
import { Select } from '../../components/select';
import { UserContext } from './dashboard';
import { Stat } from '../../components/stat';

export default function Home() {
  const user = useContext(UserContext);

  return (
    <>
      <Heading>Good afternoon, {user?.data.profile.first_name}</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>My Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>

      <div className="mt-8 flex items-end justify-between">
        <Subheading>Company Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>

      {/* display getting started flow if user has not completed it */}
      {/* else display most recent summary */}
    </>
  );
}
