export type UserStatsQuery = {
  week_start: Date;
  insight_count: string;
  tag_count: string;
  streak: string;
};

export function getUserStatsQuery(): string {
  return `
      with user_installation_date as ( select u.id as userId, i.id as teamId, i."createdAt" as installationDate
                                       from users u
                                                inner join installations i on u."teamId" = i.id
                                       where u.id = $1 ),
           start_week as ( select greatest(date_trunc('week', current_date) - interval '12 weeks',
                                           date_trunc('week', min(installationDate))) as week_start
                           from user_installation_date ),
           weeks as ( select generate_series(( select week_start from start_week ), date_trunc('week', current_date),
                                             interval '1 week') as week_start ),
           insight_counts as ( select date_trunc('week', i."createdAt") as week_start, count(i.id) as insight_count
                               from insights i
                               where i."userId" = $1
                               group by 1 ),
           tag_counts as ( select date_trunc('week', i."createdAt") as week_start,
                                  count(distinct it."tagsId")       as tag_count
                           from insights i
                                    inner join insight_tag it on i.id = it."insightsId"
                           where i."userId" = $1
                           group by 1 ),
           weekly_data as ( select w.week_start,
                                   coalesce(ic.insight_count, 0) as insight_count,
                                   coalesce(tc.tag_count, 0)     as tag_count
                            from weeks w
                                     left join insight_counts ic on w.week_start = ic.week_start
                                     left join tag_counts tc on w.week_start = tc.week_start
                            order by w.week_start ),
           streak_groups as ( select week_start,
                                     insight_count,
                                     tag_count,
                                     case when insight_count > 0 then 0
                                          else row_number() over (order by week_start) end as reset_flag
                              from weekly_data ),
           streak_calculation as ( select week_start,
                                          insight_count,
                                          tag_count,
                                          sum(case when reset_flag > 0 then 1 else 0 end) over (order by week_start) as streak_group
                                   from streak_groups ),
           streaks as ( select week_start,
                               insight_count,
                               tag_count,
                               case when insight_count > 0
                                        then row_number() over (partition by streak_group order by week_start)
                                    else 0 end as streak
                        from streak_calculation )
      select week_start, insight_count, tag_count, streak
      from streaks
      order by week_start desc;
  `;
}
