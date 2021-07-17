using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class NewScoreDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public int Score { get; set; }
    }
}