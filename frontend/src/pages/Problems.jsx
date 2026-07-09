function Problems() {

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      points: 50,
    },
    {
      id: 2,
      title: "Reverse Linked List",
      difficulty: "Medium",
      points: 100,
    },
    {
      id: 3,
      title: "Word Ladder",
      difficulty: "Hard",
      points: 200,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="px-10 py-8">

        <h1 className="text-4xl font-bold">
          Coding Problems
        </h1>

        <p className="text-gray-600 mt-2">
          Solve problems and earn reward points.
        </p>

        <div className="mt-8 space-y-5">

          {problems.map((problem) => (

            <div
              key={problem.id}
              className="bg-white shadow rounded-xl p-6 flex justify-between items-center"
            >

              <div>

                <h2 className="text-2xl font-semibold">
                  {problem.title}
                </h2>

                <div className="flex gap-4 mt-3">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {problem.difficulty}
                  </span>

                  <span className="bg-[#91F2E8]/40 px-3 py-1 rounded-full">
                    {problem.points} Points
                  </span>

                </div>

              </div>

              <button
                className="bg-[#91F2E8] px-6 py-3 rounded-lg font-semibold"
              >
                Solve
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Problems;