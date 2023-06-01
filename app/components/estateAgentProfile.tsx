import type { EstateAgent } from "~/models/estateAgents.server";

const EstateAgentProfile = ({ estateAgent }: { estateAgent: EstateAgent }) => {
  return (
    <section
      data-testid="estateAgentProfile"
      className="flex flex-col items-center gap-4 mb-6"
    >
      <img
        src="https://avatars.githubusercontent.com/u/11328618"
        width={200}
        height={200}
        className="rounded-full"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-2xl">{estateAgent.name}</h1>
        <blockquote className="italic">“{estateAgent.quote}”</blockquote>
        <a
          className="text-emerald-700 underline"
          href={`mailto:${estateAgent.email}`}
        >
          Contact estate agent
        </a>
      </div>
    </section>
  );
};

export default EstateAgentProfile;
