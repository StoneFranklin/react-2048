using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScoresController : ControllerBase
    {
        private readonly DataContext _context;
        public ScoresController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GameScore>>> GetScores()
        {
            return await _context.Scores.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<GameScore>> Create(NewScoreDto dto)
        {
            var newScore = new GameScore
            {
                UserName = dto.Username,
                Score = dto.Score
            };

            _context.Scores.Add(newScore);
            await _context.SaveChangesAsync();

            return newScore;
        }
    }
}