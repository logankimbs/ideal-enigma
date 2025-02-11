import { Container } from '../../../components/landing/container';
import { Footer } from '../../../components/landing/footer';
import { GradientBackground } from '../../../components/landing/gradient';
import { Navbar } from '../../../components/landing/navbar';
import { Heading, Subheading } from '../../../components/landing/text';

export default function CultureOfCuriosity() {
  return (
    <main className="overflow-hidden">
      <GradientBackground />
      <Container>
        <Navbar
          banner={
            <div className="flex items-center gap-1 rounded-full bg-[#b060ff] px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30">
              Beta
            </div>
          }
        />
        <div className="grid grid-cols-1 gap-8 pb-24 lg:grid-cols-[15rem_1fr] xl:grid-cols-[15rem_1fr_15rem]">
          <div className="flex flex-wrap items-center gap-8 max-lg:justify-between lg:flex-col lg:items-start">
            <div className="flex items-center gap-3"></div>
          </div>
          <div className="text-gray-700">
            <div className="max-w-2xl xl:mx-auto">
              <Subheading className="mt-16">
                Last updated: January 24, 2025
              </Subheading>
              <Heading as="h1" className="mt-2">
                Privacy Policy
              </Heading>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                At Loop ("we," "our," "us"), your privacy is critically
                important to us. This Privacy Policy outlines how we collect,
                use, and protect the information you share with us when using
                our services. By using our product, you agree to the terms
                outlined below.
              </p>
              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Information We Collect
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                We collect minimal information necessary to provide and improve
                our services. Specifically:
              </p>
              <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Slack User Scopes/Information:{' '}
                  </strong>
                  We collect basic Slack user metadata such as user IDs,
                  workspace IDs, emails, and profile names to authenticate users
                  and integrate seamlessly with your Slack workspace.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Manually Submitted Insights:{' '}
                  </strong>{' '}
                  We collect insights and learnings manually submitted by users
                  via Slack through Loop to build a collaborative, searchable
                  repository of shared knowledge for your organization.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Usage Data:{' '}
                  </strong>
                  We collect aggregated, anonymized usage metrics, such as the
                  number of submissions or interaction patterns with the Loop
                  platform to report in a dashboard for your team to provide
                  insights into how Loop is used.
                </li>
              </ol>

              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                How We Use Your Data
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                We use the information you provide in the following ways:
              </p>
              <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Submitted Insights:{' '}
                  </strong>
                  We use the insights you manually submit to consolidate,
                  summarize, and circulate learnings across your organization.
                  This fosters collaboration, improves decision-making, and
                  prevents knowledge silos.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Slack User Scopes:{' '}
                  </strong>{' '}
                  We collect Basic Slack user scopes, such as user ID, workspace
                  ID, and profile information to authenticate users, facilitate
                  integration with your Slack workspace, and ensure smooth
                  operation of our services.
                </li>
              </ol>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                We are committed to ensuring that the data we collect is used
                only for these specific purposes and is never misused or shared
                without your consent.
              </p>

              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Data Protection and Security
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Your data's security is our top priority. We take the following
                measures to protect your information:
              </p>
              <ol className="list-disc pl-4 text-base/8 marker:text-gray-400">
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Encryption:{' '}
                  </strong>
                  Data is encrypted in transit (via HTTPS) and at rest using
                  industry-standard protocols.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Access Control:{' '}
                  </strong>{' '}
                  Access to sensitive data is limited to authorized personnel
                  only.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Third-Party Services:{' '}
                  </strong>{' '}
                  We only use trusted third-party services for hosting and
                  processing data.
                </li>
              </ol>

              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Data Sharing and Disclosure
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                We do <strong>not</strong> sell, rent, or share your data with
                third parties except:
              </p>
              <ol className="list-disc pl-4 text-base/8 marker:text-gray-400">
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    With Your Organization:{' '}
                  </strong>
                  Insights and learnings are shared within your Slack workspace
                  for collaborative purposes.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Legal Obligations:{' '}
                  </strong>{' '}
                  If required by law, subpoena, or legal process, we may
                  disclose limited data after ensuring appropriate safeguards
                  are in place.
                </li>
              </ol>

              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                User Controls
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                You control your data. Specifically:
              </p>
              <ol className="list-disc pl-4 text-base/8 marker:text-gray-400">
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Data Access:{' '}
                  </strong>
                  You can view your submitted insights directly within Slack or
                  in the Loop dashboard.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Data Deletion:{' '}
                  </strong>{' '}
                  If you wish to delete your data, you can request this through
                  your workspace administrator or contact us at
                  reedgubernick@gmail.com.
                </li>
                <li className="my-2 pl-2 has-[br]:mb-8">
                  <strong className="font-semibold text-gray-950">
                    Workspace Controls:{' '}
                  </strong>{' '}
                  Workspace administrators can manage integrations and user
                  access within Slack.
                </li>
              </ol>

              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Children’s Privacy
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                Loop is intended for professional use only. We do not knowingly
                collect data from children under 13.
              </p>

              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Changes to This Policy
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                We may update this Privacy Policy from time to time. Significant
                changes will be communicated via Slack or email notifications to
                the workspace administrator.
              </p>

              <h2 className="mb-10 mt-12 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                Contact Us
              </h2>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                If you have any questions or concerns about this Privacy Policy
                or your data, please contact us at reedgubernick@gmail.com.
              </p>
              <p className="my-10 text-base/8 first:mt-0 last:mb-0">
                By using Loop, you acknowledge that you understand and agree to
                this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </main>
  );
}
