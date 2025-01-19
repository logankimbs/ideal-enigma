export type TeamStatsQuery = {
  week_start: Date;
  insight_count: string;
  tag_count: string;
  active_contributors: string;
  avg_insights_per_user: string;
};

export function getTeamStatsQuery(): string {
  return `
      with installation_date as ( select i."createdAt" as installationDate
                                  from users u
                                           inner join installations i on u."teamId" = i.id
                                  where i.id = $1 ),
           start_week as ( select greatest(date_trunc('week', current_date) - interval '12 weeks',
                                           date_trunc('week', min(installationDate))) as week_start
                           from installation_date ),
           weeks as ( select generate_series(( select week_start from start_week ), date_trunc('week', current_date),
                                             interval '1 week') as week_start ),
           insight_counts as ( select date_trunc('week', i."createdAt") as week_start,
                                      count(i.id)                       as insight_count,
                                      count(distinct i."userId")        as active_contributors
                               from insights i
                                        join users u on i."userId" = u.id
                               where u."teamId" = $1
                               group by 1 ),
           tag_counts as ( select date_trunc('week', i."createdAt") as week_start,
                                  count(distinct it."tagsId")       as tag_count
                           from insights i
                                    inner join insight_tag it on i.id = it."insightsId"
                                    join users u on i."userId" = u.id
                           where u."teamId" = $1
                           group by 1 ),
           weekly_data as ( select w.week_start,
                                   coalesce(ic.insight_count, 0)       as insight_count,
                                   coalesce(ic.active_contributors, 0) as active_contributors,
                                   coalesce(tc.tag_count, 0)           as tag_count
                            from weeks w
                                     left join insight_counts ic on w.week_start = ic.week_start
                                     left join tag_counts tc on w.week_start = tc.week_start
                            order by w.week_start ),
           total_users as ( select count(distinct id) as total_users from users where "teamId" = $1 )
      select wd.week_start,
             wd.insight_count,
             wd.tag_count,
             wd.active_contributors,
             (case when tu.total_users > 0 then wd.insight_count::float / tu.total_users
                   else 0 end) as avg_insights_per_user
      from weekly_data wd
               cross join total_users tu
      order by wd.week_start desc;
  `;
}
